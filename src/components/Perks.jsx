import React from "react";
import { perkValues } from "../utils/data";
import { preInput } from "../utils/utils";

const Perks = ({ handleChange, handleBlur, getFieldProps, selected }) => {
  return (
    <>
      {preInput({
        label: "Perks",
        id: "perks",
        description: "Lest us know the perks of your listing.",
      })}
      <div
        id="perks"
        className="grid mt-4 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      >
        {perkValues.map((perk) => (
          <label
            key={perk.value}
            className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected && selected.includes(perk.value)}
              {...getFieldProps("perks")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={perk.value}
            />
            {perk.svg}

            <span>{perk.title}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default Perks;
