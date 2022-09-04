/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload, { UploadFile } from "./upload";
//import Button from "../Button/button"

const defaultFileList: UploadFile[] = [
  {uid: "101",size: 1234,name: "hello.md",status:"uploading",percent:30},
  {uid: "102",size: 1234,name: "xyz.md",status:"success",percent:30},
  {uid: "103",size: 1234,name: "abc.md",status:"error",percent:30},

]


const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {// 大于50K
    alert("file too larger")
    return false;
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.txt", { type: file.type })
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    //https://jsonplaceholder.typicode.com/posts/
    // https://www.mocky.io/v2/5cc8019d300000980a055e76
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action("error")}
      onChange={action('changed')}
      //beforeUpload={filePromise}
      defaultFileList={defaultFileList}
      name="filename"
      data={{ 'key': 'value' }}
      headers={{ 'x-pb': "meng" }}
      accept=".jpg"
      multiple
      drag
    >
      {/* <Button size="lg" btnType="primary">点击上传</Button> */}

    </Upload>
  )
}

storiesOf("Upload", module)
.add("Upload",SimpleUpload)