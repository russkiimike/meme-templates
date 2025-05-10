"use client";
import { AbsoluteFill, Sequence, Img, interpolate, useCurrentFrame, staticFile } from "remotion";
import { z } from "zod";
import '../../styles/globals.css';
import { transform } from "next/dist/build/swc/generated-native";

// Define the schema for the component props
export const notificationSchema = z.object({
  topText: z.string(),
  image: z.string().optional(),
  backgroundColor: z.string().default("#FFFFFF"),
  template: z.number().min(1).max(3).default(1),
  notificationText: z.string(),
  macros: z.object({
    name: z.string().default("Sample Food"),
    serving: z.string().default("1 serving"),
    protein: z.number().default(0),
    carbs: z.number().default(0),
    fat: z.number().default(0)
  }).default({
    name: "Sample Food",
    serving: "1 serving",
    protein: 0,
    carbs: 0,
    fat: 0
  })
});

export type NotificationProps = z.infer<typeof notificationSchema>;

export const Notification: React.FC<NotificationProps> = ({
  topText,
  image,
  backgroundColor,
  template,
  notificationText,
  macros
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 100], [0, 1], {
    extrapolateRight: "clamp"
  });
  
  // Calculate calories using the formula: (carbs * 4) + (protein * 4) + (fat * 9)
  const calculatedCalories = (macros.carbs * 4) + (macros.protein * 4) + (macros.fat * 9);
  
  const slideDown = interpolate(frame, [0, 30], [-100, 0], {
    extrapolateRight: "clamp"
  });
  const textLines = topText.split('\\n');

  const renderTemplate1 = () => (
    <>
      {/* Main Image Sequence */}
      <Sequence className="p-10"
        style={{
          width: "1080px",
          height: "840px",
          transform: "translateY(350px)"
        }}>
        {image && (
          <Img className="rounded-5xl"
            src={image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              border: '20px'
            }}
          />
        )}
      </Sequence>

      {/* iOS Notification */}

      <Sequence style={{
      }}>
         <div style={{position: 'absolute',
          top: '100px',
          left: '0',
          right: '0',
          zIndex: 10,
        }}>   
        <div style={{
          backgroundColor: "rgb(225, 224, 224)",
          borderRadius: "16px",
          padding: "40px 34px",
          margin: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "calc(100% - 40px)",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <Img
                src={staticFile("logo.webp")}
                style={{
                  width: "84px",
                  height: "84px",
                  borderRadius: "10px"
                }}
              />
              <span style={{
                fontFamily: "SF Pro Display",
                fontWeight: "600",
                fontSize: "32px",
                color: "#000000"
              }}>
                GYMSTREAK 
              </span>
              <span style={{
                fontFamily: "SF Pro Display",
                fontWeight: "600",
                fontSize: "32px",
                color: "#000000"
              }}>
                GYMSTREAK 
              </span>
            </div>
            <span style={{
              fontFamily: "SF Pro Display",
              fontSize: "32px",
              color: "#666666"
            }}>
              1s ago
            </span>
          </div>

          {/* Message */}
          <p style={{
            fontFamily: "SF Pro Display",
            fontSize: "40px",
            color: "#000000",
            margin: 0,
            lineHeight: 1.3,
            paddingRight: "12px"
          }}>
            
            {notificationText}
          </p>
        </div>
        </div>
      </Sequence>

    </>
  );

  const renderTemplate2 = () => (
    <>
      {/* Text Container Above Image */}
      <Sequence style={{
        transform: "translateY(0px)",
      }}>
         <div style={{position: 'absolute',
        }}>
        
        <div style={{
          backgroundColor: "white",
          padding: "10px",
          margin: "20px",
      
        }}>
           {textLines.map((line, index) => (
          <h1
          key={index}
           style={{
            fontFamily: "SF Pro Display",
            fontSize: "48px",
            fontWeight: "600",
            color: "#000",
            margin: 0,
            lineHeight: 1.3,
            textAlign: "center"
          }}>
            {line}
          </h1>
           ))};
        </div>
        </div>
      </Sequence>

      {/* Main Image */}
      <Sequence className=""
        style={{
          width: "100%",
          height: "840px",
          transform: "translateY(250px)"
        }}>
        {image && (
          <Img className="rounded-5xl"
            src={image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              border: '20px'
            }}
          />
        )}
      </Sequence>

      {/* iOS Notification Below Image */}
      <Sequence style={{
        transform: "translateY(990px)",
        justifyContent:"center",
        alignItems:"center",
        height:"350px",    
        background:"url(https://i.pinimg.com/736x/13/87/a3/1387a36df4c1beb28437f177760dca03.jpg)",
        backgroundRepeat:"no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "100%"  
      }}>
        <div style={{position: 'absolute',
          top: '100px',
          left: '0',
          right: '0',
          zIndex: 10,
          
        }}>
        <div style={{
          backgroundColor: "rgb(225, 224, 224)",
          borderRadius: "16px",
          padding: "40px 34px",
          margin: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "calc(100% - 40px)",
          display: "flex",
          flexDirection: "column",
          opacity: fadeIn,
          
        }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <Img
                src={staticFile("logo.webp")}
                style={{
                  width: "84px",
                  height: "84px",
                  borderRadius: "10px"
                }}
              />
              <span style={{
                fontFamily: "SF Pro Display",
                fontWeight: "600",
                fontSize: "32px",
                color: "#000000"
              }}>
                GYMSTREAK
              </span>
            </div>
            <span style={{
              fontFamily: "SF Pro Display",
              fontSize: "32px",
              color: "#666666"
            }}>
              1s ago
            </span>
          </div>

          {/* Message */}
          <p style={{
            fontFamily: "SF Pro Display",
            fontSize: "40px",
            color: "#000000",
            margin: 0,
            lineHeight: 1.3,
            paddingRight: "12px"
          }}>
            {notificationText}
          </p>
        </div>
        </div>
      </Sequence>
    </>
  );

  const MacroCard = () => (
    <div style={{position: 'absolute',
      top: '100px',
      left: '0',
      right: '0',
      zIndex: 10,
    }}>
      <div style={{
        backgroundColor: "#1E2A4D",
        borderRadius: "20px",
        padding: "24px",
        width: "calc(100% - 40px)",
        margin: "20px",
        color: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom:"10px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,
            minWidth: 0,
          }}>
            <div style={{
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <Img
                src={staticFile("logo.webp")}
                style={{
                  width: "84px",
                  height: "84px",
                  borderRadius: "6px"
                }}
              />
            </div>
            <div style={{
              minWidth: 0,
            }}>
              <div style={{
                fontFamily: "SF Pro Display",
                fontWeight: "600",
                fontSize: macros.name.length > 15 ? "32px" : "42px",
                color: "white",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {macros.name}
              </div>
              <div style={{
                fontFamily: "SF Pro Display",
                fontSize: "38px",
                fontWeight: "400",
                color: "#8F9BB3"
              }}>
                {macros.serving}
              </div>
            </div>
          </div>
          <div style={{
            fontFamily: "SF Pro Display",
            fontSize: "38px",
            fontWeight: "600",
            color: "#0aaba5",
            marginLeft: "12px",
            flexShrink: 0,
          }}>
            {calculatedCalories} kcal
          </div>
        </div>
        {/* Macros Grid */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop:"10px",
          borderTop:"4px solid rgb(173, 172, 172, 0.2)"

         
        }}>
          <MacroItem label="Protein" value={macros.protein} unit="g" />
          <MacroItem label="Carbohydrates" value={macros.carbs} unit="g" />
          <MacroItem label="Fat" value={macros.fat} unit="g" />
        </div>
      </div>
    </div>
  );

  const MacroItem = ({ label, value, unit }: { label: string; value: number; unit: string }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "SF Pro Display",
        fontSize: "40px",
        color: "#8F9BB3",
        marginBottom: "8px",
       
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "SF Pro Display",
        fontSize: "38px",
        fontWeight: "600",
        color: "white"
      }}>
        {value} {unit}
      </div>
    </div>
  );

  const renderTemplate3 = () => (
    <>
      {/* Text Container Above Image */}
      <Sequence style={{
        transform: "translateY(0px)",
      }}>
         <div style={{position: 'absolute',
         width: "100%",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         
        }}>
        
        <div style={{
          
          backgroundColor: "white",
          padding: "10px",
          margin: "20px",
      
        }}>
           {textLines.map((line, index) => (
          <h1
          key={index}
           style={{
            fontFamily: "SF Pro Display",
            fontSize: "48px",
            fontWeight: "600",
            color: "#000",
            margin: 0,
            lineHeight: 1.3,
            textAlign: "center"
          }}>
            {line}
          </h1>
           ))};
        </div>
        </div>
      </Sequence>

      {/* Main Image */}
      <Sequence className=""
        style={{
          width: "100%",
          height: "60%",
          transform:'translateY(250px)'
        }}>
        {image && (
          <Img className="rounded-5xl"
            src={image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              border: '20px',
              alignItem: 'center',
              justifyItem:'center'
            }}
          />
        )}
      </Sequence>
      {/* Macro Card Below Image */}
      <Sequence style={{
        transform: "translateY(880px)",
      }}>
        <MacroCard />
      </Sequence>
    </>
  );

  return (
    <AbsoluteFill className="flex justify-center items-center bg-black">
      <AbsoluteFill className="bg-white flex flex-col justify-center items-center"
        style={{
          width: "1080px",
          height: "1340px",
          position: "relative",
          opacity: fadeIn
        }}>
        {template === 3 ? renderTemplate3() : template === 2 ? renderTemplate2() : renderTemplate1()}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}; 