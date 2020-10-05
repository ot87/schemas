import React from 'react';
import { FieldArray } from 'react-final-form-arrays';

import css from './SchemaFormItems.module.css';
import Item from '../../Common/Item/Item';
import FormField from '../../Common/FormField/FormField';

/**
 * Function with validation rule.
 * @callback ValidationFunction
 * @param {string} value - Value to validate.
 * @returns {boolean} - Indicates whether value is valid.
 */

/**
 * Renders Schema's items in the table-like style with the help of the [FieldArray]{@link https://github.com/final-form/react-final-form-arrays#fieldarray--reactcomponenttypefieldarrayprops} and [FormField]{@link FormField}.
 * @param {Object}             props
 * @param {Object[]}           props.initItems          - Initial values of the schema's items.
 * @param {number}             props.initItems.id       - Initial item id.
 * @param {string}             props.initItems.name     - Initial item name.
 * @param {string}             props.initItems.quantity - Initial item quantity.
 * @param {string}             props.initItems.time     - Initial item time.
 * @param {ValidationFunction} props.onValidate         - Field validation function.
 * @param {boolean}            props.isRemoveClicked    - Indicates whether Remove button is clicked.
 * @param {number[]}           props.itemsIdsToRemove   - Array of items ids to remove from the form.
 * @param {function}           props.handleRemoveOnItemsRowClick - On item row click function.
 */
const SchemaFormItems = ({
    initItems,
    onValidate,
    isRemoveClicked,
    itemsIdsToRemove,
    handleRemoveOnItemsRowClick
}) => (
    <FieldArray
        name='items'
        initialValue={initItems}
        render={({ fields }) => fields.map((name, index) => {
            let rowCss = css.items;

            if (isRemoveClicked) {
                rowCss += ' ' + css.remove;
                if (itemsIdsToRemove.indexOf(index) !== -1) {
                    rowCss += ' ' + css.clickedItemsRow;
                }
            }

            return (
                <div
                    key={index}
                    role="row"
                    onClick={() => isRemoveClicked && handleRemoveOnItemsRowClick(index)}
                    className={rowCss}
                >
                    <Item>
                        <FormField
                            name={`${name}.name`}
                            type='text'
                            tag='input'
                            validate={onValidate}
                            disabled={isRemoveClicked}
                            placeholder='Name'
                        />
                    </Item>
                    <Item>
                        <FormField
                            name={`${name}.quantity`}
                            type='text'
                            tag='input'
                            validate={onValidate}
                            disabled={isRemoveClicked}
                            placeholder='Quantity'
                        />
                    </Item>
                    <Item>
                        <FormField
                            name={`${name}.time`}
                            type='text'
                            tag='input'
                            disabled={isRemoveClicked}
                            placeholder='Time'
                        />
                    </Item>
                </div>
            );
        })}
    />
);

export default SchemaFormItems;