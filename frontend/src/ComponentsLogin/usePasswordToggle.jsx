import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const usePasswordToggle = () => {
    const [visible, setVisiblity] = useState(false);

    // El componente FontAwesomeIcon recibe el objeto del icono importado, 
    // y alternamos entre 'faEye' y 'faEyeSlash' según el estado 'visible'.
    const Icon = (
        <FontAwesomeIcon
            icon={visible ? faEyeSlash : faEye}
            onClick={() => setVisiblity(visibility => !visibility)}
        />
    );

    const InputType = visible ? "text" : "password";

    return [InputType, Icon];
};

export default usePasswordToggle;
