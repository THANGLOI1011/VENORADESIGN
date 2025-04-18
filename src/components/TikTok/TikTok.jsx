import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import './TikTok.css';
import { CgPlayButtonO } from "react-icons/cg";

const TikTok = () => {
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Hiển thị 6 video ban đầu

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const dbRef = ref(getDatabase(), "tiktokVideos");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const videoList = await Promise.all(
            Object.values(snapshot.val()).map(async (video) => {
              const match = video.embedCode.match(/data-video-id="(\d+)"/);
              const userMatch = video.embedCode.match(/@([a-zA-Z0-9._-]+)/);

              if (!match || !userMatch) return null;

              const videoId = match[1];
              const username = userMatch[1];

              const oEmbedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${username}/video/${videoId}`;
              let thumbnailUrl = "", title = "", hashtags = "";

              try {
                const response = await fetch(oEmbedUrl);
                const data = await response.json();
                thumbnailUrl = data.thumbnail_url || "";
                // Tách tiêu đề và hashtag
                title = (data.title || "").replace(/#[^\s#]+/g, "").trim();
                hashtags = (data.title || "").match(/#[^\s#]+/g)?.join(" ") || "";
              } catch (error) {
                console.error("⚠️ Lỗi khi lấy dữ liệu từ oEmbed:", error);
              }

              return { videoId, thumbnailUrl, title, hashtags };
            })
          );

          setVideos(videoList.filter(Boolean));
        }
      } catch (error) {
        console.error("🔥 Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchVideos();
  }, []);
  const loadMoreVideos = () => {
    setVisibleCount((prev) => prev + 8); // Mỗi lần tải thêm 6 video
  };

  return (
    <div className="bg-tiktok">
      <div className="tiktok innerWidth paddings">
      <div className="tiktok-items flexColStart t-head">
        <span className="orangeText">Trải nghiệm</span>
        <span className="primaryText">Video viral TikTok</span>
      </div>
      <div className="video-container">
        {videos.slice(0, visibleCount).map((video, index) => (
          <Link to={`/tiktok/${video.videoId}`} key={index} className="video-item">
            <div className="video-thumbnail-container">
              <img
                src={video.thumbnailUrl || "https://via.placeholder.com/300"}
                alt="TikTok Thumbnail"
                className="video-thumbnail"
              />
              <div className="play-button"><CgPlayButtonO /></div>
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