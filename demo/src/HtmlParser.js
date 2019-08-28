import React, { useState } from "react";
import { Input, Button, Col, Row, message } from "antd";
import { convert } from "html-to-react-parser";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import copy from "copy-to-clipboard";

const { TextArea } = Input;

const HtmlParser = props => {
  function translateToReact() {
    if (inputValue) {
      try {
        setTranslation(convert(inputValue, { spaces: 2 }));
      } catch (e) {
        message.error("Please enter valid HTML for conversion");
      }
    } else {
      message.warn("Please enter HTML for conversion");
    }
  }

  function copyClipboard() {
    message.success("Text copied successfully!");
    copy(translation);
  }
  const [translation, setTranslation] = useState("");
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <TextArea
            rows={15}
            value={inputValue}
            onChange={evt => setInputValue(evt.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Button onClick={translateToReact}>Converter</Button>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          {translation && (
            <>
              <SyntaxHighlighter
                language="jsx"
                style={prism}
                onClick={copyClipboard}>
                {translation}
              </SyntaxHighlighter>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default HtmlParser;
