import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { primaryBlueColour, primaryRedColour, primarySilverColour, showPage } from "../App";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../db";

function TextEditor(props) {
  const { initialContent, onSave, onChange, setDataToBeSaved, disabled, email } = props;
  const editorRef = useRef(null);
  const log = (e) => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      onSave(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      showPage();
    }, 0);
  });
  return (
    <div align="right" style={{ marginTop: "0px", position: 'relative' }}>
      <input style={{position: 'absolute', display: 'none'}}
      onChange={(e)=>{
        document.querySelector('[type="url"]').value = 'loading...';
        const imgIdInStorage = `topicinline/${email}/${new Date().toString().replaceAll(' ', '')}.jpg`
        const mountainImagesRef = ref(storage, imgIdInStorage);
        uploadBytes(mountainImagesRef, e.target.files[0]).then((snapshot) => {
          console.log(snapshot);
          console.log('Uploaded a blob or file!');
          getDownloadURL(ref(storage, imgIdInStorage))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url);

            document.querySelector('[type="url"]').value = url;
            document.querySelector('#form-field_2162870596771679733597765').value = '120';
            document.querySelector('#form-field_3972544796781679733597765').value = '120';
            e.target.value = null;
             
          })
          .catch((error) => {
            alert(error);
          });
        });
        console.log(e.target.files[0])
      }}
      id="imgUpload" type="file"/>
      {!disabled && <Editor
        disabled={disabled}
        apiKey="your-api-key"
        onInit={(evt, editor) => {
          const uploadImageElement = document.querySelector('[aria-label="Insert/edit image"]');
          uploadImageElement.addEventListener('click', () => {
            document.querySelector('#imgUpload').click();
          }); 

          return editorRef.current = editor}}
        initialValue={initialContent !== "" ? initialContent : '<p><i style="color: silver;">type here ...</i></p>'}
        onKeyUp={() => {
          onChange();
          setDataToBeSaved(editorRef.current.getContent());
        }}
        onChange={()=>{
          onChange();
          setDataToBeSaved(editorRef.current.getContent());
        }}
        init={{
          height: '88vh',
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "blocks | " +
            "bold italic forecolor backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | " +
            "table | image | link",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; borderRadius: 0px;}",
        }}
      />}
      {
        disabled && <div><div align="center" style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height:'18vh'}}>
          <h3 style={{backgroundColor: 'white', color: primaryBlueColour, border: '1px solid '+primaryBlueColour}}>Add topics for this scope to enable the editor</h3>
           
          {/* <i className='fas fa-arrow-right' style={{color: 'silver', fontSize: '27px', marginLeft: '30px'}}></i> */}
          <div style={{height: '0px',borderTop: '1px solid '+ primaryBlueColour, width: '10%'}}></div>
        </div>
        <br/>
        <br/>

        </div>
      }
   
    </div>
  );
}

export default TextEditor;
