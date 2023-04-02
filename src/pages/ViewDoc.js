import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from "../App";
import { Loader } from "../assets";
import { SearchLoader } from "../components/Loaders";
import { getDocument, topicsCollection, usersCollection } from "../db";

function ViewDoc(props) {
  const { email, projecttitle } = useParams();
  const [user, setUser] = useState(null);

  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);

  const [currentTopicData, setCurrentTopicData] = useState(null);

  useEffect(() => {
    getDocument(usersCollection, email).then((res) => {
      setUser(res.data());
    });
  }, [email, projecttitle]);

  useEffect(() => {
    const res = {
      data: () => user,
    };
    const currentPathObj = user?.paths?.find((x) => x.title === res.data()?.paths?.filter((x) => x.project === projecttitle && x.topics.length > 0)[0]?.title && x.project === projecttitle);
    if (
       currentPathObj?.topics[0]
    ) {

      setCurrentPath(
      currentPathObj?.title
      );
      setCurrentTopicId(currentPathObj?.topics[0]?.id);
    //   alert(currentTopicId);



    //   alert(user?.paths?.find((x) => x.title === user?.paths?.filter((x) => x.project === projecttitle && x.topics.length > 0)[0]?.title)?.topics[0]?.id)
       if(currentTopicId) getDocument(
          topicsCollection,
          currentPathObj?.topics[0]?.id
        )
          .then((res) => {
            // alert(JSON.stringify(res.data()));
            setCurrentTopicData(res.data()?.data?.replaceAll('<a', '<a target="_blank"'));
          })
          .catch((err) => {
            alert(err);
          });
    }
  }, [user]);

  useEffect(() => {
    if (currentTopicId) {
      getDocument(topicsCollection, currentTopicId)
        .then((res) => {
          setCurrentTopicData(res.data()?.data?.replaceAll('<a', '<a target="_blank"'));
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [currentTopicId]);

  return user === null ? (
    <SearchLoader />
  ) : (
    <div align="left">
      <div
        style={{
          paddingTop: "15px",
          paddingBottom: "80px",
          backgroundColor: primaryGreenColour(0.3),
          width: "100vw",
          marginLeft: "-8px",
        }}
      >
        <div style={{ fontSize: "30px", paddingLeft: "10px" }}>
          {projecttitle}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", paddingLeft: '10px', paddingBottom: '15px', marginTop: '15px' }}>
          {user?.paths
            ?.filter((x) => x.project === projecttitle)
            .filter((x) => x.topics.length > 0)
            .map((path) => {
              return (
                <button
                  onClick={() => {
                    setCurrentPath(path.title);
                    if (
                      user?.paths?.find((x) => x.title === path.title && x.project === projecttitle)?.topics
                        ?.length > 0
                    ) {
                      setCurrentTopicId(
                        user?.paths?.find((x) => x.title === path.title && x.project === projecttitle)
                          ?.topics[0].id
                      );
                    } else {
                      setCurrentTopicId(null);
                      setCurrentTopicData(null);
                    }
                  }}
                  style={{
                    backgroundColor:
                      currentPath !== path.title
                        ? primarySilverColour
                        : primaryBlueColour,
                    color: currentPath !== path.title ? "black" : "white",
                    margin: '0px',
                    borderRadius: '0px',
                    paddingLeft: '23px',
                    paddingRight: '23px',
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 5px",
                  }}
                >
                  {path.title}
                </button>
              );
            })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          marginLeft: "-8px",
        }}
      >
        <div
          style={{
            width: "18vw",
            display: "flex",
            height: "70vh",
            overflow: "scroll",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: '-70px',
            background:`linear-gradient(${primarySilverColour},${primarySilverColour}, white)`,
          }}
        >
          {user?.paths
            ?.filter((x) => x.project === projecttitle)
            .find((x) => x.title === currentPath)
            ?.topics?.map((topic, i) => {
              return (
                <button
                  onClick={() => {
                    setCurrentTopicId(topic.id);
                  }}
                  style={{
                    textAlign: "left",
                    margin: '0px',
                     backgroundColor:
                      currentTopicId !== topic.id
                      ? primarySilverColour :
                      "white",
                    borderLeft: currentTopicId === topic.id
                    ? '3px solid '+primaryBlueColour
                    : '0px',
                    color: currentTopicId !== topic.id ? "black" : "black",
                    borderRadius: '0px',
                    paddingLeft: currentTopicId === topic.id
                    ? '7px'
                    : '10px'
                  }}
                >
                  {i + 1}. {topic?.title}
                </button>
              );
            })}
        </div>
        <div style={{ width: "75vw", marginTop: '-70px', backgroundColor:'white', paddingRight: '14px' }} align="center">
          {currentTopicId && (
            <iframe
              style={{
                width: "100%",
                paddingLeft:'10px',
                border: "0px",
                height: "77vh",
              }}
              srcDoc={currentTopicData}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDoc;
