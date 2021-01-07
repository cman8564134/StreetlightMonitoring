import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CustomMenuContainer from '../CustomMenuContainer/CustomMenuContainer';

const CustomMenuItem = ( props ) => {
    const {
        parentId,
        id,
        label,
        multiLevelMenuNavItems,
        menuExpandState,
        level,
        onToggleCaret
    } = props;


    const currentMenuItemId = parentId !== 0 ? parentId + "/" + id : id;

    const nextLevel = (parseInt(level) + 1).toString();
    
    const hasChild = multiLevelMenuNavItems[nextLevel] && multiLevelMenuNavItems[nextLevel][currentMenuItemId] && multiLevelMenuNavItems[nextLevel][currentMenuItemId].length > 0;
    
    let angleDownIcon = null;
    let childMenuItems = null;
    
    if(hasChild){
        angleDownIcon = (
            <i 
                className="metismenu-state-icon pe-7s-angle-down caret-left metismenu-caret-left" 
                onClick={(e)=> onToggleCaret(e, currentMenuItemId)}
            />
        )

        childMenuItems = (
            <CustomMenuContainer
                {...props}
                multiLevelMenuNavItems={multiLevelMenuNavItems}
                level={nextLevel}
                menuExpandState={menuExpandState}
                parentId={currentMenuItemId}
                onToggleCaret={onToggleCaret}
            />
        )
    }

    return (
        <Fragment>
            <li className="metismenu-item">
                <div className="metismenu-link">
                    <Link to={"/dashboard/" + currentMenuItemId}>{label}</Link>
                    {angleDownIcon}
                </div>
                {childMenuItems}
            </li>
            
                                        
        </Fragment>
    )
}

export default CustomMenuItem;