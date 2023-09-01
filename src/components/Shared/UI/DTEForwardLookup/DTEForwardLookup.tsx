import { Grid } from "@material-ui/core";
import { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "nhsuk-react-components";
import { Close } from "@material-ui/icons";
import { Button, IconButton } from "@mui/material";
import ICheckBoxElement from "../DTECheckList/ICheckBoxElement";
import DTECheckList from "../DTECheckList/DTECheckList";
import { baseButton, baseButtonProps } from "../DTEButton/DTEButton";
import theme from "../../../../theme";

type Props = {
  id: string;
  label: string;
  hint?: string;
  values?: string[];
  error?: string;
  data: string[];
  placeholder?: string;
  onSelectedValuesChange: (value: string[]) => void;
};

const StyledButtonGrid = styled(Grid)`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const StyledCheckGrid = styled(Grid)`
  && {
    margin-top: -1.6em;
    padding: 0.5em;
    border: 3px solid ${(Props) => Props.theme.NIHR.Blue};
    border-top: none;
    border-radius: 0.3rem;
    max-height: 20em;
    overflow-y: scroll;
    legend {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
      border: 3px solid ${(Props) => Props.theme.NIHR.LighterGreen};
    }
  }
`;

const StyledInput = styled(Input)`
  border-radius: 0.3rem;
  border-color: ${(Props) => Props.theme.NIHR.Grey};
  &:focus {
    border: 4px solid ${(Props) => Props.theme.NIHR.Blue};
    box-shadow: none;
    outline: 4px solid ${(Props) => Props.theme.NIHR.Yellow};
  }
  margin-bottom: 0;
`;

const StyledSelectedButton = styled(Button)<baseButtonProps>`
  && {
    ${baseButton};
    margin: 0.5em 0.5em 0 0;
  }
`;

const StyledHiddenUpdatePane = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  border: 0;
  white-space: nowrap;
`;

const StyledClearButton = styled(IconButton)`
  && {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.3em;
    &:hover {
      background-color: transparent;
    }
  }
`;

const StyledCheckList = styled(DTECheckList)``;

const StyledInputDiv = styled.div`
  position: relative;
  width: 100%;
`;

function DTEForwardLookup({ id, label, hint, values, error, data, onSelectedValuesChange, placeholder }: Props) {
  const [selectedData, setSelectedData] = useState<string[]>(values || []);
  const [inputValue, setInputValue] = useState("");
  const [checkBoxDataList, setCheckBoxDataList] = useState<ICheckBoxElement[]>();
  const [checkBoxExpanded, setCheckBoxExpanded] = useState(false);

  const buildCheckBoxFilteredList = (filter: string) => {
    let filtered: string[] = [];
    if (filter !== "") {
      filtered = data.filter((element) => element.toLowerCase().includes(filter.toLowerCase()));
    }
    filtered = filtered.filter((v, i, a) => a.findIndex((t) => t === v) === i).sort((a, b) => (a > b && 1) || -1);
    return filtered;
  };

  const buildCheckBoxList = (dataList: string[]) => {
    const buildData: ICheckBoxElement[] = [];
    dataList.forEach((dataItem) => {
      const index = selectedData.findIndex((x) => x === dataItem);
      const element: ICheckBoxElement = {
        text: dataItem,
        value: dataItem,
        disabled: false,
        checked: index > -1,
      };
      buildData.push(element);
    });
    return buildData;
  };

  const handleInputValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCheckBoxDataList(buildCheckBoxList(buildCheckBoxFilteredList(e.target.value)));
    setCheckBoxExpanded(true);
  };

  const handleRemoveSelectedChoice = (index: number) => {
    setSelectedData((oldSelectedData) => oldSelectedData.filter((_, i) => i !== index));
    if (checkBoxDataList) {
      const mappedCheckboxes = checkBoxDataList;
      checkBoxDataList?.forEach((checkBox, mapperIndex) => {
        if (checkBox.text === selectedData[index]) {
          mappedCheckboxes[mapperIndex].checked = false;
        }
      });
      setCheckBoxDataList(mappedCheckboxes);
    }
  };

  const handleRemoveSelectedChoiceKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.code === "Space") {
      const selectedText = selectedData[index];
      const checkBoxes = checkBoxDataList;
      checkBoxes?.forEach((checkBox, checker) => {
        if (checkBox.text === selectedText) {
          checkBoxes[checker].checked = false;
        }
      });
      setCheckBoxDataList(checkBoxes);
      setSelectedData((oldSelectedData) => oldSelectedData.filter((_, i) => i !== index));
    }
  };

  const handleCheckBoxValuesChanged = (e: ICheckBoxElement[]) => {
    const addedData: string[] = [];
    const checkBoxValues: string[] = [];

    e.forEach((checkBox) => {
      if (checkBox.checked) {
        addedData.push(checkBox.value);
      }
      checkBoxValues.push(checkBox.value);
    });

    const nonAffectedSelectedItems = selectedData.filter((x) => !checkBoxValues.includes(x));

    setSelectedData(
      [...nonAffectedSelectedItems, ...addedData]
        .filter((v, i, a) => a.findIndex((t) => t === v) === i)
        .sort((a, b) => (a > b && 1) || -1)
    );

    setCheckBoxDataList(e);
  };

  const DropdownEsc = (e: any) => {
    if (e.code === "Escape") {
      setCheckBoxDataList(buildCheckBoxList(buildCheckBoxFilteredList("")));
      document.getElementById(id)?.focus();
    }
  };

  useEffect(() => {}, [checkBoxDataList]);

  useEffect(() => {
    onSelectedValuesChange(selectedData);
  }, [selectedData]);

  return (
    <Grid container>
      <Grid item xs={12} aria-live="assertive" data-testid={`${id}-selected-area`}>
        {selectedData.length > 0 ? (
          <StyledHiddenUpdatePane data-testid={`${id}-selected-area-count`}>
            You have {selectedData.length}
            {selectedData.length === 1 ? " area" : " areas"} selected
          </StyledHiddenUpdatePane>
        ) : (
          <></>
        )}
      </Grid>
      <StyledButtonGrid item xs={12}>
        {selectedData.map((button, index) => (
          <StyledSelectedButton
            aria-label={`Remove ${button} from your selections`}
            key={button}
            variant="outlined"
            endIcon={<Close />}
            disableRipple
            onClick={() => handleRemoveSelectedChoice(index)}
            onKeyDown={(e) => handleRemoveSelectedChoiceKeyDown(e, index)}
            $outlined
          >
            {button}
          </StyledSelectedButton>
        ))}
      </StyledButtonGrid>
      <Grid item xs={12}>
        <StyledInputDiv>
          <StyledInput
            id={id}
            label={label}
            hint={hint}
            error={error}
            value={inputValue}
            onChange={handleInputValueChanged}
            placeholder={placeholder}
            role="combobox"
            aria-autocomplete="list"
            aria-controls={`${id}checkboxes`}
            aria-expanded={checkBoxExpanded}
            aria-describedby={`${id}-result-area-count`}
            aria-live="assertive"
          />
          <StyledClearButton
            aria-label="Clear your search"
            onClick={() => {
              setInputValue("");
              setCheckBoxDataList(buildCheckBoxList(buildCheckBoxFilteredList("")));
            }}
            disabled={inputValue === ""}
            data-testid="clear-icon"
          >
            <Close
              style={{
                color: inputValue === "" ? "grey" : theme.palette.primary.main,
              }}
            />
          </StyledClearButton>
        </StyledInputDiv>

        <StyledHiddenUpdatePane data-testid={`${id}-result-area-count`} id={`${id}-result-area-count`}>
          {inputValue && inputValue !== "" ? (
            <>There are {checkBoxDataList?.length || 0} results available</>
          ) : (
            <>Please type your search</>
          )}
        </StyledHiddenUpdatePane>
      </Grid>
      {checkBoxDataList && checkBoxDataList.length > 0 ? (
        <StyledCheckGrid item xs={12}>
          <StyledCheckList
            values={checkBoxDataList || []}
            id={`${id}checkboxes`}
            name={`${id}checkboxes`}
            label={`${id} options`}
            onValueChange={handleCheckBoxValuesChanged}
            data-testid={`${id}-checklist`}
            escKeyPressed={DropdownEsc}
          />
        </StyledCheckGrid>
      ) : (
        <span id={`${id}checkboxes`} />
      )}
    </Grid>
  );
}

export default DTEForwardLookup;
