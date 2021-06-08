import React, { Fragment } from 'react';
import cx from 'classnames';
import CustomMenuItem from '../CustomMenuItem/CustomMenuItem';

const CustomMenuContainer = ( props ) => {
    const {
        multiLevelMenuNavItems,
        menuExpandState,
        parentId,
        level,
        onToggleCaret
    } = props;

    const menuItemsArray = multiLevelMenuNavItems[level] ? Object.values(multiLevelMenuNavItems[level]) : null;

    return (
        <Fragment>
            <ul className={cx("metismenu-container", {visible: parentId ? menuExpandState[parentId].isExpand : true})}>

            {menuItemsArray ? 
                menuItemsArray.map((menuItemGroupByParentId) => {
                    return menuItemGroupByParentId.map((menuItem,index) => {
                        const {
                            id,
                            label
                        } = menuItem;
    
                        if (!parentId || parentId === menuItem.parentId){
                            return <CustomMenuItem
                                        {...props}
                                        key={index}
                                        parentId={menuItem.parentId}
                                        id={id}
                                        label={label}
                                        multiLevelMenuNavItems={multiLevelMenuNavItems}
                                        menuExpandState={menuExpandState}
                                        level={level}
                                        onToggleCaret={onToggleCaret}
                                    />
                        }
                        else return null
                    })

                    
                })
                :null
            }    
            </ul>
                                        
        </Fragment>
    )
}

export default CustomMenuContainer;