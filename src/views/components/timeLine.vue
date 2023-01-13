<template>
  <div class="time">
    <FullCalendar
      class="calenderCon"
      :options="calendarOptions"
      ref="fullCalendar"
    />
  </div>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import interactionPlugin from "@fullcalendar/interaction";
import { ref } from "vue";
import timelinePlugin from "@fullcalendar/timeline";
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale.css";
import { defineProps } from "vue";
import { getmeetings } from "@/api/request";
import { useStore } from "@/stores/store";
const store = useStore();
const props = defineProps(["room"]);
const roomId = 5;
const meetings = ref([]);
const calendarOptions = ref({
  eventMinHeight: 20,
  eventMinWidth: 85,
  nowIndicator: true,
  height: 110,
  headerToolbar: {
    start: "title",
    center: "",
    end: "today prev,next",
  },
  locale: "zh-cn",
  plugins: [interactionPlugin, timelinePlugin],
  initialView: "timelineDay",
  schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
  slotLabelFormat: {
    hour: "numeric",
    minute: "2-digit",
    omitZeroMinute: true,
    meridiem: "short",
    hour12: false,
  },
  slotMinTime: "07:00:00",
  slotMaxTime: "23:00:00",
  slotDuration: "01:00:00",
  events: [
    // {
    //   meeting_id: 102,
    //   title: "网络安全会议",
    //   start: "2022-11-13 15:00:00",
    //   end: "2022-11-13 17:30:00",
    //   color: "transparent",
    //   textColor: "white",
    //   backgroundColor: "rgba(248, 100, 3, 0.9)",
    // },
    // {
    //   meeting_id: 102,
    //   title: "软件工程会议",
    //   start: "2022-11-13 19:00:00",
    //   end: "2022-11-13 20:00:00",
    //   color: "transparent",
    //   textColor: "white",
    //   backgroundColor: "rgba(248, 100, 3, 0.9)",
    // },
    // {
    //   meeting_id: 102,
    //   title: "软件工程会议2",
    //   start: "2022-11-14 8:00:00",
    //   end: "2022-11-14 10:00:00",
    //   color: "transparent",
    //   textColor: "white",
    //   backgroundColor: "rgba(248, 100, 3, 0.9)",
    // },
  ],
  eventMouseEnter: (info) => {
    console.log(info);
    tippy(info.el, {
      content:
        "<div style='width: 280px;font-size:12px;overflow:hidden;padding:10px 0 20px;z-index:1;'>" +
        "<div style='color:#000;font-size:14px;font-weight:700; " +
        "'>" +
        info.event.title +
        "</div>" +
        "<div style='border-bottom: 0.01rem solid #D8D8D8;line-height: 30px;color: #333;font-size:12px;'>" +
        props.room.name +
        "(" +
        props.room.roomId +
        ")" +
        "</div>" +
        "<div style='color: #333;font-size:12px;line-height: 30px;border-bottom: 0.01rem solid #D8D8D8;'>" +
        "会议时间:" +
        info.event.start.toTimeString().slice(0, 8) +
        "---" +
        info.event.end.toTimeString().slice(0, 8) +
        "</div>" +
        "<div style='color: #333;font-size:12px;margin-top:10px;'>会议召集人：" +
        "admin" +
        "</div>" +
        "<div style='color: #333;font-size:12px;margin-top:5px;'>会议联系人：" +
        "admin" +
        " " +
        "88888" +
        "</div>" +
        "</div>",
      animation: "scale",
      theme: "light",
      allowHTML: true,
    });
  },
});

const getMeetingRoomUsage = async () => {
  const meetData = await getmeetings(roomId);
  let newFormatEvents = [];
  store.meetingList = meetData;
  if (meetData) {
    for (let meet of meetData) {
      let obj = {
        meeting_id: meet.meetingid,
        title: meet.meetingname,
        start: meet.starttime,
        end: meet.endtime,
        color: "transparent",
        textColor: "white",
        backgroundColor: "rgba(248, 100, 3, 0.9)",
      };
      newFormatEvents.push(obj);
    }
  }
  calendarOptions.value.events = newFormatEvents;
};
getMeetingRoomUsage();
</script>

<style lang="scss">
.tiem {
  overflow: hidden;
}
</style>
