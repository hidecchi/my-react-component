"use client";

import { CheckBox } from "@/component/CheckBox/CheckBox";
import { Input } from "@/component/Input";
import { Modal, type ModalHandler } from "@/component/Modal";
import { RadioButton } from "@/component/RadioButton";
import { Select } from "@/component/Select";
import { Tab, TabItem } from "@/component/Tab";
import { TextArea } from "@/component/TextArea";
import { useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const modalRef = useRef<ModalHandler>(null);
  return (
    <div className={styles.container}>
      <CheckBox label="同意する" />
      <RadioButton label="同意する" />
      <Input />
      <Select
        optionData={[
          { value: "選択肢1", text: "選択肢1" },
          { value: "選択肢2", text: "選択肢2" },
          { value: "選択肢3", text: "選択肢3" },
        ]}
      />
      <TextArea />
      <div>
        <Tab defaultLabel="タブ1">
          <TabItem label="タブ1">
            <p>タブ1のコンテンツ</p>
          </TabItem>
          <TabItem label="タブ2">
            <p>タブ2のコンテンツ</p>
          </TabItem>
          <TabItem label="タブ3">
            <p>タブ3のコンテンツ</p>
          </TabItem>
        </Tab>
      </div>
      <button
        type="button"
        onClick={(event) => modalRef.current?.handleOpen(event)}
        style={{
          width: "fit-content",
          lineHeight: "2.4rem",
          padding: "1rem",
          border: "0.1rem solid #aaa",
        }}
      >
        モーダルを開く
      </button>
      <Modal ref={modalRef}>
        <div
          style={{
            width: "40rem",
            height: "40rem",
            background: "white",
            padding: "2rem",
            fontSize: "2.4rem",
          }}
        >
          モーダルのコンテンツ
        </div>
      </Modal>
    </div>
  );
}
