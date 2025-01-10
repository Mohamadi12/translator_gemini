"use client";

import { translate } from "@/actions/translate";
import { useState } from "react";
import DropDown from "./components/DropDown";
import VoiceRecorder from "./components/VoiceRecorder";
import SaveBtn from "./components/SaveTranslationBtn";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

const Home = () => {
  const [languageFrom, setLanguageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("es");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const onSave = () => {
    setIsSaved(true);
  };

  const handleLanguageFromChange = (value) => {
    setLanguageFrom(value);
  };

  const handleLanguageToChange = (value) => {
    setLanguageTo(value);
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  const handleInputSet = async (value) => {
    setInputText(value);
    const formData = new FormData();
    formData.append("text", value);
    formData.append("languageTo", languageTo);
    formData.append("languageFrom", languageFrom);
    const translation = await translate(formData);
    setTranslatedText(translation.translation);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form
          className="w-full"
          action={async (formData) => {
            const result = await translate(formData);
            setTranslatedText(result.translation);
            if (isSaved) {
              setIsSaved(false);
            }
          }}
        >
          <div className="flex flex-row gap-4">
            <div className="container flex flex-col">
              <DropDown
                name="languageFrom"
                value={languageFrom}
                options={languageOptions}
                onChange={handleLanguageFromChange}
              />
              <textarea
                placeholder="Enter text to translate"
                className="border border-slate-800 rounded-md p-4"
                value={inputText}
                name="text"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="container flex flex-col">
              <div className="justify-between flex">
                <DropDown
                  name="languageTo"
                  value={languageTo}
                  options={languageOptions}
                  onChange={handleLanguageToChange}
                />
                <SaveBtn
                  sourceLan={languageFrom}
                  targetLan={languageTo}
                  sourceText={inputText}
                  targetText={translatedText}
                  onHandleSave={onSave}
                  isSaved={isSaved}
                />
              </div>
              <textarea
                placeholder="Translated text will appear here"
                className="border border-slate-800 rounded-md p-4"
                value={translatedText}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 h-16">
            <button
              type="submit"
              className="p-2  rounded-md bg-slate-800 text-white"
            >
              translate
            </button>
            {languageFrom === "en" && (
              <VoiceRecorder handleSetText={handleInputSet} />
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
