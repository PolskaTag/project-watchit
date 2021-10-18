import React from react
import {
    DropdownWrapper,
    StyledSelect,
    StyledOption,
    StyledLabel,
    StyledButton
} from ".style/stylejs";
import "./style/VideoPlayer.css";

export function VideoPlayeer(props) {
    return (
        <DropdownWrapper action={props.action}>
            <StyledLabel htmlFor="services">
                <StyledSelect id="services" name="services">
                    {props.children}
                </StyledSelect>
            </StyledLabel>
        </DropdownWrapper>
    );
}

export function Option(props) {
    return (
        <StyledOption selected={props.selected}>
            {props.value}
        </StyledOption>
    );
}


<select name="selectList" id="selectList">
    <option value="option 1">Option 1</option>
    <option value="option 2">Option 2</option>
</select>


