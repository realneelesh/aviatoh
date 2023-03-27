import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { primaryBlueColour, primarySilverColour } from "../App";
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
    if (
      res.data()?.paths &&
      user?.paths?.find(
        (x) => x.title === res.data()?.paths?.filter((x) => x.project === projecttitle && x.topics.length > 0)[0]?.title)?.topics[0]
    ) {
    //   alert(res.data()?.paths?.filter((x) => x.project === projecttitle)?.filter((x) => x.topics.length > 0)[0]?.title);
      setCurrentPath(
        res.data()?.paths?.filter((x) => x.project === projecttitle)?.filter((x) => x.topics.length > 0)[0]?.title
      );
      setCurrentTopicId(
        user?.paths
          ?.filter((x) => x.project === projecttitle)
          .find(
            (x) => x.title === res.data()?.paths.filter((x) => x.project === projecttitle)[0].title
          )?.topics[0]?.id
      );

        getDocument(
          topicsCollection,
          user?.paths?.find(
            (x) =>
              x.title ===
              res.data()?.paths?.filter((x) => x.project === projecttitle && x.topics.length > 0)[0]
                ?.title
          )?.topics[0]?.id
        )
          .then((res) => {
            setCurrentTopicData(res.data()?.data);
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
          setCurrentTopicData(res.data()?.data);
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
          padding: "10px 0px",
          backgroundColor: primarySilverColour,
          width: "100vw",
          marginLeft: "-8px",
        }}
      >
        <div style={{ fontSize: "30px", paddingLeft: "10px" }}>
          {projecttitle}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {user?.paths
            ?.filter((x) => x.project === projecttitle)
            .filter((x) => x.topics.length > 0)
            .map((path) => {
              return (
                <button
                  onClick={() => {
                    setCurrentPath(path.title);
                    if (
                      user?.paths?.find((x) => x.title === path.title)?.topics
                        ?.length > 0
                    ) {
                      setCurrentTopicId(
                        user?.paths?.find((x) => x.title === path.title)
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
                  }}
                >
                  {path.title}
                </button>
              );
            })}
        </div>
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
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
                    marginBottom: "0px",
                    backgroundColor:
                      currentTopicId !== topic.id
                        ? primarySilverColour
                        : primaryBlueColour,
                    color: currentTopicId !== topic.id ? "black" : "white",
                  }}
                >
                  {i + 1}. {topic?.title}
                </button>
              );
            })}
        </div>
        <div style={{ width: "82vw" }} align="center">
          {currentTopicId && (
            <iframe
              style={{
                width: "97%",
                border: "0px",
                height: "70vh",
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
