import request from "./index";

export const getmeetings = (roomId) => {
  return request({
    url: `http://localhost:8081/getmeetingsbyroomid?roomId=${roomId}`,
  });
};
export const face = (
  img = "https://img1.baidu.com/it/u=1855186669,2470716053&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=749"
) => {
  return request({
    url: "https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=24.3a3620161acf98be20593225e0c40944.2592000.1671692038.282335-26479665",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      image: img,
      // image_type: "BASE64",
      image_type: "URL",
      group_id_list: "01",
    },
  });
};

export const opendoor = () => {
  return request({
    url: "http://192.168.1.115:8080/door?open=true",
    method: "GET",
  });
};
