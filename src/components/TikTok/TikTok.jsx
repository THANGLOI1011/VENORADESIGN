import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import "./TikTok.css";
import { CgPlayButtonO } from "react-icons/cg";

const TikTok = () => {
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const dbRef = ref(getDatabase(), "tiktokVideos");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const rawList = Object.values(snapshot.val())
            .map((video) => {
              const match = video.embedCode.match(/data-video-id="(\d+)"/);
              const userMatch = video.embedCode.match(/@([a-zA-Z0-9._-]+)/);
              if (!match || !userMatch) return null;
              return {
                videoId: match[1],
                username: userMatch[1],
                thumbnailUrl: "",
                title: "",
                hashtags: "",
              };
            })
            .filter(Boolean);

          setVideos(rawList);

          rawList.forEach(async (item, idx) => {
            const oEmbedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${item.username}/video/${item.videoId}`;
            try {
              const response = await fetch(oEmbedUrl);
              const data = await response.json();
              setVideos((prev) =>
                prev.map((v, i) =>
                  i === idx
                    ? {
                        ...v,
                        thumbnailUrl: data.thumbnail_url || "",
                        title: (data.title || "")
                          .replace(/#[^\s#]+/g, "")
                          .trim(),
                        hashtags:
                          (data.title || "").match(/#[^\s#]+/g)?.join(" ") ||
                          "",
                      }
                    : v
                )
              );
            } catch (error) {
            }
          });
        }
      } catch (error) {
        console.error("🔥 Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchVideos();
  }, []);
  const loadMoreVideos = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div data-aos="fade-up" className="bg-tiktok">
      <div className="tiktok innerWidth paddings">
        <div className="tiktok-items flexColStart t-head">
          <span className="orangeText">Trải nghiệm</span>
          <span className="primaryText">Video viral TikTok</span>
        </div>
        <div className="video-container">
          {videos.slice(0, visibleCount).map((video, index) => (
            <Link
              to={`/tiktok/${video.videoId}`}
              key={index}
              className="video-item"
            >
              <div className="video-thumbnail-container">
                <img
                  src={video.thumbnailUrl || "https://via.placeholder.com/300"}
                  alt="TikTok Thumbnail"
                  className="video-thumbnail"
                />
                <div className="play-button">
                  <CgPlayButtonO />
                </div>
                <div className="related-video-info">
                  <p className="video-title ">{video.title}</p>
                  <p className="video-hashtags">{video.hashtags}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="btn-width">
          {visibleCount < videos.length && (
            <button className="button" onClick={loadMoreVideos}>
              Tải thêm video
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TikTok;
