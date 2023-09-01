import { useState } from "react";
import {
  convertToRaw,
  convertFromHTML,
  EditorState,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import DTERichTextValidators from "./DTERichTextValidators";

type Props = {
  id: string;
  label?: string;
  hint?: string;
  value?: string;
  disabled?: boolean;
  error?: string;
  onValueChange: (value: string) => void;
};

const StyledEditor = styled.div`
  && {
    .rdw-editor-toolbar {
      border: none;
      padding: 0;

      .rdw-inline-wrapper .rdw-option-wrapper,
      .rdw-list-wrapper .rdw-option-wrapper,
      .rdw-link-wrapper .rdw-option-wrapper,
      .rdw-history-wrapper .rdw-option-wrapper {
        border-color: #000;
      }
    }

    .editor--override {
      font-weight: 400;
      font-size: 16px;
      font-size: 1rem;
      line-height: 1.5;
      -webkit-appearance: none;
      appearance: none;
      border: 2px solid ${(props) => props.theme.NIHR.Grey};
      border-radius: 0.3rem;
      margin-top: 0;
      padding: 4px;
      width: 100%;
      vertical-align: top;
      min-height: 6em;

      &:focus {
        border: 4px solid ${(props) => props.theme.NIHR.Blue};
        box-shadow: none;
        outline: 4px solid ${(props) => props.theme.NIHR.Yellow};
      }

      .public-DraftStyleDefault-block {
        margin-top: 0;
        margin-bottom: 0;
        a {
          color: ${(props) => props.theme.NIHR.LinkBlue};
          text-decoration-color: ${(props) => props.theme.NIHR.LinkBlue};
          text-underline-offset: 2.5px;
          &:focus {
            color: ${(props) => props.theme.NIHR.Blue};
            text-decoration: none;
            background-color: ${(props) => props.theme.NIHR.Yellow};
            box-shadow: 0 -2px ${(props) => props.theme.NIHR.Yellow},
              0 4px #212b32;
          }
          &:hover {
            color: ${(props) => props.theme.NIHR.Blue};
            text-decoration-color: ${(props) => props.theme.NIHR.Blue};
            text-decoration-line: underline;
            text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
            &:focus {
              text-decoration-line: none;
              text-decoration-thickness: none;
            }
          }
          &:visited {
            color: ${(props) => props.theme.NIHR.LinkBlue};
            &:focus {
              color: ${(props) => props.theme.NIHR.Blue};
            }
            &:hover {
              color: ${(props) => props.theme.NIHR.Blue};
            }
          }
        }
      }

      .public-DraftStyleDefault-ul,
      .public-DraftStyleDefault-ol {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 16px;

        li,
        li {
          margin-bottom: 0;
        }

        .public-DraftStyleDefault-unorderedListItem
          .public-DraftStyleDefault-block,
        .public-DraftStyleDefault-unorderedListItem
          .public-DraftStyleDefault-block {
          margin-bottom: 0;
        }

        .public-DraftStyleDefault-block,
        .public-DraftStyleDefault-block {
          margin-bottom: 0;
        }
      }
    }
  }
`;

const DTERichTextEditor = ({
  id,
  label,
  hint,
  onValueChange,
  error,
  value,
  disabled,
}: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    DTERichTextValidators.isHtml(value || "")
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(value || "").contentBlocks
          )
        )
      : EditorState.createWithContent(ContentState.createFromText(value || ""))
  );
  const inValidState = error !== "" && error !== undefined;

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    onValueChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  return (
    <>
      <div
        className={`nhsuk-form-group ${
          inValidState ? "nhsuk-form-group--error" : ""
        }`}
      >
        <label className="nhsuk-label" id={`${id}--label`}>
          {label}
          {hint && (
            <span className="nhsuk-hint" id={`${id}--hint`}>
              {hint}
            </span>
          )}
          {inValidState && (
            <span
              className="nhsuk-error-message"
              id={`${id}--error-message`}
              role="alert"
            >
              <span className="nhsuk-u-visually-hidden">Error: </span>
              {error}
            </span>
          )}
          <StyledEditor>
            <Editor
              webDriverTestID={`${id}-editor-element`}
              handlePastedText={() => false}
              readOnly={disabled}
              editorClassName="editor--override"
              onEditorStateChange={onEditorStateChange}
              editorState={editorState}
              toolbar={{
                options: ["inline", "list", "link", "history"],
                inline: {
                  inDropdown: false,
                  options: ["bold"],
                },
                list: {
                  inDropdown: false,
                  options: ["unordered", "ordered"],
                },
                link: {
                  inDropdown: false,
                  showOpenOptionOnHover: true,
                  defaultTargetOption: "_self",
                  options: ["link", "unlink"],
                  linkCallback: undefined,
                },
                history: {
                  inDropdown: false,
                  options: ["undo", "redo"],
                },
              }}
            />
          </StyledEditor>
        </label>
      </div>
    </>
  );
};

export default DTERichTextEditor;
