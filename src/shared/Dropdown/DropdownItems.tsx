import { twMerge } from 'tailwind-merge';
import { IDropdownItemsProps } from './interface';

/**
 * Render a list of dropdown items.
 *
 * @param {Array} items - An array of dropdown items.
 * @param {boolean} closeOnItemClick - Whether to close the dropdown menu when an item is clicked.
 * @param {Function} close - A callback function automatically added by  to close the dropdown menu.
 * @return {JSX.Element} - The rendered dropdown items.
 */
const DropdownItems = ({
  items,
  closeOnItemClick,
  close,
}: IDropdownItemsProps) => {
  // Create an unordered list to hold the dropdown items
  return (
    <ul>
      {items?.map(
        (item, index) =>
          // Create a list item for each item in the provided items array while checking whether the item is to be hidden or not
          !item.hide && (
            <li
              key={index}
              // Set the class name of the list item using tailwind CSS
              className={twMerge(
                'text-xs px-3 py-2 cursor-pointer',
                item.className,
              )}
              onClick={() => {
                if (!close) return;
                // Call the provided onClick function if it exists, otherwise call close
                if (item.onClick) {
                  item.onClick(close);
                  // Close the dropdown menu if closeOnItemClick is true
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  closeOnItemClick && close();
                } else {
                  close();
                }
              }}
            >
              {item.label}
            </li>
          ),
      )}
    </ul>
  );
};

DropdownItems.defaultProps = {
  closeOnItemClick: true,
};

export default DropdownItems;
