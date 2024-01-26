import { useEffect, useState } from 'react';
import Template from './template';
import { useContent } from '../../../../context/ContentContext';
import { adminAxios } from '../../../../api/axios';
import TitleDescriptionTemplate from './titleDescriptionTemplate';

function Edit_Title() {
    return <TitleDescriptionTemplate property={'title'} textbox={false} />;
}

export default Edit_Title;
