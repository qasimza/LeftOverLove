import { createSignal } from "solid-js";
import { QRCodeCanvas } from "solid-qr-code";

interface QRCodeGeneratorProps {
  value: number;
}

function QRCodeGenerator(props: QRCodeGeneratorProps) {
  const qrCodeValue = props.value.toString();
  
  const [value] = createSignal(qrCodeValue);

  // Calculate the QR code size based on the screen width
  const screenWidth = window.innerWidth;
  const qrCodeSize = screenWidth <= 480 ? 96 : 128; // Adjust as needed

  // Adjust image size based on screen width
  const imageSettings = {
    src: "https://i.imgur.com/9t6acgk.png",
    x: undefined,
    y: undefined,
    height: screenWidth <= 480 ? 8 : 12, // Adjust as needed
    width: screenWidth <= 480 ? 8 : 12, // Adjust as needed
  };

  return (
    <QRCodeCanvas
      value={value()}
      size={qrCodeSize}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={true} // Add margins for better readability on smaller screens
      imageSettings={imageSettings}
    />
  );
}

export default QRCodeGenerator;
