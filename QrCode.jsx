import { useState } from "react"


export const QrCodeGenerator = () =>{

    const [img,setImage] = useState("");
    const [loadingMsg,setMessage] = useState(false);
    const [qrLink,setQrLink] = useState("shiva");
    const [qrSize,setQrSize] = useState("80");

    async function generateQr(){
        setMessage(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrLink)}`;
            setImage(url);
        }
        catch(err){
            console.error("occurred",err);
        }
        finally{
            setMessage(false);
        }
    }
    function downloadQr(){
        fetch(img)
        .then((Response) => Response.blob())
        .then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "QRcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    return(
        <div className="App-container">
            <h1>QR CODE GENERATOR </h1>
            {img && <img src={img} className="qr-image"></img>}
            {loadingMsg && <p>Please wait...</p>}
            <div>
                <label htmlFor="dataInput" className="input-label">
                    Enter Data for QR Code
                </label>
                <input type="text" onChange={(e)=>setQrLink(e.target.value)} id="dataInput" placeholder="Enter data for QR code">
                </input>

                <label htmlFor="sizeInput" className="input-label">
                    Enter Size for QR Code
                </label>
                <input type="text" onChange={(e)=>setQrSize(e.target.value)} id="sizeInput" placeholder="Enter image size eg.300">
                </input>

                <button className="generateButton" onClick={generateQr} disabled= {loadingMsg}>Generate QR code</button>
                <button className="downloadButton" onClick={downloadQr}>Download QR code</button>

            </div>

            <p className="footer">designed by <a href="none">sivaraj</a></p>

        </div>
    )
}