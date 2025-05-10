"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { Notification } from "../remotion/Meme/Notification";
import { notificationSchema } from "../remotion/Meme/Notification";
import { Main } from "../remotion/MyComp/Main";
import { CompositionProps } from "../types/constants";
import { z } from "zod";
import { RenderControls } from "../components/RenderControls";
import { Tips } from "../components/Tips/Tips";
import { Spacing } from "../components/Spacing";

const container: React.CSSProperties = {
  maxWidth: 1400,
  margin: "auto",
  marginBottom: 20,
  padding: "0 20px",
};

const outer: React.CSSProperties = {
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  marginBottom: 40,
  marginTop: 60,
};

const player: React.CSSProperties = {
  width: "100%",
};

const formStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  marginBottom: "1rem",
  height: "fit-content",
};

const layoutContainer: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  alignItems: "flex-start",
};

const playerContainer: React.CSSProperties = {
  flex: "1",
  minWidth: 0,
};

const formContainer: React.CSSProperties = {
  flex: "1",
  minWidth: 0,
};

const inputStyles: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const labelStyles: React.CSSProperties = {
  fontWeight: "bold",
  marginBottom: "0.25rem",
};

const compositionSelector: React.CSSProperties = {
  marginBottom: "1rem",
  padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
};

const Home: NextPage = () => {
  const [selectedComposition, setSelectedComposition] = useState("Notification");
  const [formData, setFormData] = useState({
    topText: "Your Top Text Here",
    notificationText: "Your notification text here",
    template: 1,
    backgroundColor: "#FFFFFF",
    image: "",
    macros: {
      name: "Sample Food",
      serving: "1 serving",
      protein: 20,
      carbs: 30,
      fat: 10
    }
  });

  const [mainCompData, setMainCompData] = useState({
    title: "Welcome to Remotion"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('macros.')) {
      const macroField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        macros: {
          ...prev.macros,
          [macroField]: macroField === 'name' || macroField === 'serving' ? value : Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'template' ? Number(value) : value
      }));
    }
  };

  const handleMainCompChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMainCompData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputProps: z.infer<typeof notificationSchema> = useMemo(() => {
    return formData;
  }, [formData]);

  const mainCompProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return mainCompData;
  }, [mainCompData]);

  const renderComposition = () => {
    switch (selectedComposition) {
      case "Notification":
        return (
          <Player
            component={Notification}
            inputProps={inputProps}
            durationInFrames={150}
            fps={30}
            compositionHeight={1920}
            compositionWidth={1080}
            style={player}
            controls
            autoPlay
            loop
          />
        );
      case "Main":
        return (
          <Player
            component={Main}
            inputProps={mainCompProps}
            durationInFrames={150}
            fps={30}
            compositionHeight={1080}
            compositionWidth={1920}
            style={player}
            controls
            autoPlay
            loop
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={container}>
        <div style={layoutContainer}>
          <div style={playerContainer}>
            <div className="cinematics" style={outer}>
              {renderComposition()}
            </div>
          </div>

          <div style={formContainer}>
            <div style={compositionSelector}>
              <label style={labelStyles}>Select Composition</label>
              <select
                value={selectedComposition}
                onChange={(e) => setSelectedComposition(e.target.value)}
                style={inputStyles}
              >
                <option value="Notification">Notification</option>
                <option value="Main">Main</option>
              </select>
            </div>

            {selectedComposition === "Notification" && (
              <div style={formStyles}>
                <div>
                  <label style={labelStyles}>Template</label>
                  <select
                    name="template"
                    value={formData.template}
                    onChange={handleInputChange}
                    style={inputStyles}
                  >
                    <option value={1}>Template 1</option>
                    <option value={2}>Template 2</option>
                    <option value={3}>Template 3</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyles}>Top Text</label>
                  <input
                    type="text"
                    name="topText"
                    value={formData.topText}
                    onChange={handleInputChange}
                    style={inputStyles}
                  />
                </div>

                <div>
                  <label style={labelStyles}>Notification Text</label>
                  <input
                    type="text"
                    name="notificationText"
                    value={formData.notificationText}
                    onChange={handleInputChange}
                    style={inputStyles}
                  />
                </div>

                <div>
                  <label style={labelStyles}>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    style={inputStyles}
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label style={labelStyles}>Background Color</label>
                  <input
                    type="color"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleInputChange}
                    style={inputStyles}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: "0.5rem" }}>Macros</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div>
                      <label style={labelStyles}>Food Name</label>
                      <input
                        type="text"
                        name="macros.name"
                        value={formData.macros.name}
                        onChange={handleInputChange}
                        style={inputStyles}
                      />
                    </div>
                    <div>
                      <label style={labelStyles}>Serving Size</label>
                      <input
                        type="text"
                        name="macros.serving"
                        value={formData.macros.serving}
                        onChange={handleInputChange}
                        style={inputStyles}
                      />
                    </div>
                    <div>
                      <label style={labelStyles}>Protein (g)</label>
                      <input
                        type="number"
                        name="macros.protein"
                        value={formData.macros.protein}
                        onChange={handleInputChange}
                        style={inputStyles}
                      />
                    </div>
                    <div>
                      <label style={labelStyles}>Carbs (g)</label>
                      <input
                        type="number"
                        name="macros.carbs"
                        value={formData.macros.carbs}
                        onChange={handleInputChange}
                        style={inputStyles}
                      />
                    </div>
                    <div>
                      <label style={labelStyles}>Fat (g)</label>
                      <input
                        type="number"
                        name="macros.fat"
                        value={formData.macros.fat}
                        onChange={handleInputChange}
                        style={inputStyles}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedComposition === "Main" && (
              <div style={formStyles}>
                <div>
                  <label style={labelStyles}>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={mainCompData.title}
                    onChange={handleMainCompChange}
                    style={inputStyles}
                  />
                </div>
              </div>
            )}

            <RenderControls
              text={selectedComposition === "Notification" ? formData.topText : mainCompData.title}
              setText={(text) => {
                if (selectedComposition === "Notification") {
                  setFormData(prev => ({ ...prev, topText: text }));
                } else {
                  setMainCompData(prev => ({ ...prev, title: text }));
                }
              }}
              inputProps={selectedComposition === "Notification" ? inputProps : mainCompProps}
              compositionId={selectedComposition === "Notification" ? "Notification" : "MyComp"}
            />
            <Spacing />
            <Tips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
