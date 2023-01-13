<template>
  <div class="main-body">
    <div>
      <div class="header room-name">{{ room.name }}</div>
      <div class="header time"><NowTime></NowTime></div>
    </div>
    <div>
      <div style="display: inline-block; height: 100%">
        <div>当前会议：{{ meeting.meetingName }}&nbsp;15:00--16:00</div>
        <div>下场会议：软件工程会议&nbsp;19:00--21:00</div>
      </div>
      <div style="display: inline-block; height: 100%">
        <img
          style="height: 100px; width: 100px; display: block"
          src="@/assets/code.jpg"
        />
        <span>扫码签到/预定</span>
        <img
          style="height: 50px; width: 50px; display: block"
          src="@/assets/face.jpg"
        />
      </div>
    </div>
  </div>
  <div class="main-footer"><TimeLine></TimeLine></div>
</template>

<script setup>
import TimeLine from "./components/timeLine.vue";
import NowTime from "./components/date.vue";
import { ref } from "vue";
import { useStore } from "@/stores/store";
const store = useStore();
const meeting = ref({
  nowMeetingName: "",
  nextMeetingName: "",
  nowMeetingTime: "",
  nextMeetingTime: "",
});
const room = ref({
  name: "102会议室",
});
</script>

<style lang="scss" scoped>
.main-body {
  height: auto;
  margin: 20px 50px;
  .room-name {
    text-align: center;
  }
  .time {
    text-align: center;
    margin-left: 200px;
  }
}
.main-footer {
  padding: 20px 50px;
}
.header {
  display: inline-block;
}
</style>
