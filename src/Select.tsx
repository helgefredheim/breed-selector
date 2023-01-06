// eslint-disable-next-line no-unused-vars
import React, { useCallback, useRef, useState } from "react";
import { useOutsideClick } from "./hooks";
import "./Select.css";

// eslint-disable-next-line no-unused-vars
type OnChange = (value: any) => void;

interface SelectProps {
  value: any;
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: any) => React.ReactNode;
  onChange: OnChange;
  items: any[];
  id: string;
  label: string;
  placeholder: string;
}
export const Select = ({
  value,
  items,
  renderItem,
  onChange,
  id,
  label,
  placeholder,
}: SelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = useCallback(() => setOpen((wasOpen) => !wasOpen), [setOpen]);

  const ref = useRef(null);

  useOutsideClick(ref.current, () => setOpen(false));

  return (
    <div className="select" ref={ref}>
      <label id={`${id}-label`}>{label}</label>
      <div className="select__dropdown">
        <div
          role="combobox"
          tabIndex={0}
          className="select__button"
          aria-expanded={open}
          aria-labelledby={`${id}-label`}
          aria-haspopup="listbox"
          aria-controls={`${id}-options`}
          onClick={toggle}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") {
              toggle();
            }
          }}>
          {value || placeholder}
        </div>
        {open && (
          <div role="listbox" className="select__options" id={`${id}-options`}>
            {items.map((item, index) => {
              return (
                <div
                  key={item.id || index}
                  tabIndex={0}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      onChange(item);
                      setOpen(false);
                    }
                  }}
                  className="select__option">
                  {renderItem(item)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
