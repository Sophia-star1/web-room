<template>
  <div class="body">
    <div class="main-body">
      <div class="infor">
        <div class="header">
          <div class="title">{{ room.name }}</div>
          <div style="margin-left: 5%"><NowTime></NowTime></div>
        </div>
        <div class="meeting-infor">
          <div class="meeting">
            <p class="mt-text" style="margin-bottom: 10%">
              当前会议：网络安全会议<br />15:00--17:30
            </p>
            <p class="mt-text">下场会议：软件工程会议<br />19:00--20:00</p>
          </div>
          <div class="code-part">
            <p style="margin-top: 100%">扫码预定</p>
            <img style="margin-top: 10%; width: 70%" src="@/assets/code.png" />
          </div>
        </div>
      </div>
      <div class="face-part">
        <div class="icon" style="padding-top: 30%">
          <img class="img" src="@/assets/face1.png" />
          <button class="button" @click="takephoto()">人脸签到</button>
        </div>
        <div class="icon" style="padding-top: 10%">
          <img class="img" src="@/assets/face2.png" />
          <button class="button" @click="showface()">人脸开门</button>
        </div>
      </div>
    </div>
    <div class="footer"><TimeLine></TimeLine></div>
  </div>
  <canvas id="canvas"></canvas>
  <div id="face">
    <div>
      <!-- <img
        src="@/assets/x.png"
        style="float: right; width: 40px; height: 40px"
        @click="closeface()"
      /> -->
    </div>
    <video
      autoplay="autoplay"
      id="video"
      style="width: 500px; height: 400px; margin-left: 90px; margin-top: 20px"
    ></video>
  </div>
  <div @click="openTest" class="buttontest">TTTTTTT</div>
</template>
<script setup>
import { ElNotification } from "element-plus";
import TimeLine from "./components/timeLine.vue";
import NowTime from "./components/date.vue";
import { ref } from "vue";
import { face } from "@/api/request";
import { openDoor } from "@/utils/face";
import { opendoor } from "@/api/request";

const openTest = () => {
  ElNotification({
    title: "Success",
    message: "This is a success message",
    type: "success",
  });
};

const room = ref({
  roomId: 102,
  name: "102会议室",
});

function showface() {
  //打开人脸窗口
  let face = document.getElementById("face");
  face.style.display = "block";
  let video = document.getElementById("video");
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((success) => {
      video.srcObject = success;
      video.play();
    })
    .catch((error) => {
      console.error("摄像头开启失败，请检查摄像头是否可用！");
    });
}
function closeface() {
  //关闭人脸窗口
  let face = document.getElementById("face");
  let video = document.getElementById("video");
  video.srcObject.getTracks()[0].stop();
  face.style.display = "none";
}

const takephoto = async () => {
  let video = document.getElementById("video");
  let canva = document.getElementById("canvas");
  let context = canva.getContext("2d");
  context.drawImage(video, 0, 0, 500, 400);
  let img = canva.toDataURL("image/png").slice(22);
  let { data } = await face();
  if (openDoor(data.result.user_list)) {
    ElNotification({
      title: "Success",
      message: "开门",
      type: "success",
    });
    await opendoor();
  } else {
    ElNotification({
      title: "Warning",
      message: "没有权限",
      type: "warning",
    });
  }
};
</script>

<style lang="scss" scoped>
#face {
  padding: 10px;
  margin-top: 50px;
  margin-left: 200px;
  width: 700px;
  height: 500px;
  background-color: #3b9fb9;
  border-color: #ffff;
  border-style: solid;
  border-width: 15px;
  position: absolute;
  z-index: 3;
  display: none;
}
#canvas {
  position: absolute;
  width: 500px;
  height: 400px;
  z-index: -1;
  background-color: #ffff;
}
.body {
  width: 1000px;
  height: 600px;
  background-color: #3b9fb9;
  color: #ffff;
  position: absolute;
  .main-body {
    width: 100%;
    height: 70%;
    .infor {
      float: left;
      height: 100%;
      width: 70%;
      .header {
        height: 20%;
        width: 100%;
        .title {
          text-align: center;
          font-size: 50px;
        }
      }
      .meeting-infor {
        height: 80%;
        width: 100%;

        .meeting {
          background-color: #ffff;
          color: #3b9fb9;
          float: left;
          height: 100%;
          width: 75%;
          padding: 10%;
          .mt-text {
            font-size: 30px;
          }
        }
        .code-part {
          text-align: center;
          float: right;
          height: 100%;
          width: 25%;
        }
      }
    }
    .face-part {
      float: right;
      height: 100%;
      width: 30%;
      background-color: #ffff;
      color: #3b9fb9;
      padding-left: 3%;
      padding-right: 3%;
      .icon {
        height: 50%;
        width: 100%;
        .img {
          height: 110px;
          width: 110px;
          display: block;
          float: left;
        }
        .button {
          height: 40px;
          width: 100px;
          margin-top: 20%;
          float: right;
          color: #ffff;
          background-color: #3b9fb9;
          border: none;
          border-radius: 30px;
        }
      }
    }
  }

  .footer {
    height: 30%;
    width: 100%;
    padding: 3%;
  }
}
</style>
