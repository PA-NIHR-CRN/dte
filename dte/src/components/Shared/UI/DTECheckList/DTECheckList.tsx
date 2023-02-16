import { Checkboxes, Fieldset } from "nhsuk-react-components";
import { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ICheckBoxElement from "./ICheckBoxElement";

type Props = {
  id: string;
  name: string;
  label?: string;
  hint?: string;
  error?: string;
  values: ICheckBoxElement[];
  onValueChange: (values: ICheckBoxElement[]) => void;
};

const StyledFieldset = styled(Fieldset)``;
const StyledFieldsetLegend = styled(Fieldset.Legend)``;
const StyledCheckboxes = styled(Checkboxes)`
  // && Overrides the NHS default styling
  && {
    // The checkbox border
    input + label::before {
      border-radius: 0.3rem;
    }

    // The checkbox border once clicked
    input:focus + label::before {
      border: 0.2rem solid ${(Props) => Props.theme.NIHR.Blue};
      outline: 0.2rem solid ${(Props) => Props.theme.NIHR.Yellow};
      color: ${(Props) => Props.theme.NIHR.Blue};
    }

    // The tick
    input + label::after {
      color: ${(Props) => Props.theme.NIHR.Blue};
    }
  }
`;

const DTECheckList = memo(
  ({ id, name, label, hint, error, values, onValueChange }: Props) => {
    const [checkBoxList, setCheckBoxList] = useState<ICheckBoxElement[]>([]);
    const [renderToggle, setRenderToggle] = useState(false);
    useMemo(() => {}, [renderToggle]);

    const handleOnChange = (e: any) => {
      const updatedList = checkBoxList;
      const valuesIndex = checkBoxList.findIndex(
        (x) => x.value === e.target.value
      );
      if (valuesIndex > -1) {
        updatedList[valuesIndex].checked = e.target.checked;
      }
      setCheckBoxList(updatedList);
      onValueChange(updatedList);
      setRenderToggle(!renderToggle);
    };

    useEffect(() => {
      setCheckBoxList(values);
    }, [values]);

    const checkBoxElements = values.map((item) => (
      <Checkboxes.Box
        key={item.value}
        value={item.value}
        disabled={item.disabled}
        conditional={item.conditional}
        onClick={(e: any) => handleOnChange(e)}
        onKeyPress={(e: any) => handleOnChange(e)}
        checked={item.checked}
      >
        {item.text}
      </Checkboxes.Box>
    ));

    return error !== "" && error !== undefined ? (
      <StyledFieldset>
        <StyledFieldsetLegend>{label}</StyledFieldsetLegend>
        <StyledCheckboxes name={name} id={id} hint={hint} error={error}>
          {checkBoxElements}
        </StyledCheckboxes>
      </StyledFieldset>
    ) : (
      <StyledFieldset>
        <StyledFieldsetLegend>{label}</StyledFieldsetLegend>
        <StyledCheckboxes name={name} id={id} hint={hint}>
          {checkBoxElements}
        </StyledCheckboxes>
      </StyledFieldset>
    );
  }
);

export default DTECheckList;
