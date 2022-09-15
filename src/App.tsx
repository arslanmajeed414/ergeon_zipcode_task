import React, { useState } from "react";
import { Hint } from "react-autocomplete-hint";
import { zipCodes } from "./data";

export default function App() {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(true);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(code)) {
      setIsValid(false);

      setTimeout(() => {
        setIsValid(true);
      }, 1000);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center rounded-sm">
      <form
        autoComplete="on"
        onSubmit={submitHandler}
        className="w-1/2 h-2/5 bg-gray-200 flex flex-col items-center"
      >
        <label className="mb-6 mt-6 text-xl font-bold" htmlFor="zip">
          Enter Americans zip code
        </label>
        {!isValid && (
          <p className="mb-4 block w-3/4 h-7 text-red-600 bg-red-200">
            Not a Valid zip code
          </p>
        )}

        <Hint options={zipCodes}>
          <input
            value={code}
            className="text-lg outline-none py-2 px-4"
            type="text"
            name="zip"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length > 10) return;
              setCode(event.target.value);
              if (
                event.target.value.length === 6 &&
                event.target.value.includes("-")
              ) {
                setCode(event.target.value.replace("-", ""));
              } else if (event.target.value.length === 5) {
                setCode(event.target.value + "-");
              }
            }}
          />
        </Hint>
        <button
          type="submit"
          className="bg-red-200 mt-6 py-2 px-4 rounded hover:bg-red-300"
        >
          Validate Zip
        </button>
      </form>
    </div>
  );
}
