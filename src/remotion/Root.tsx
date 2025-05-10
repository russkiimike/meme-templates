import { Composition } from "remotion";
import { Notification, notificationSchema } from "./Meme/Notification";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Notification"
        component={Notification}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        schema={notificationSchema}
        defaultProps={{
          topText:
            '"Bro I dont get why I can\'t gain weight"\\nBros one meal a day:',
          notificationText: "Your notification text here",
          template: 3,
          backgroundColor: "#FFFFFF",
          image:
            "https://preview.redd.it/gf-says-that-my-standard-combo-of-noodles-and-sardines-v0-73groyhqef9e1.jpeg?width=1080&crop=smart&auto=webp&s=0645b53ea393c2b37121bbbe0c4265b1f3223b69",
          macros: {
            name: "Sarnooodles",
            serving: "1 serving",
            protein: 89,
            carbs: 5,
            fat: 40,
          },
        }}
      />
    </>
  );
};
