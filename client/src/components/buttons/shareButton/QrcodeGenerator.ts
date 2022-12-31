import QRCode from 'qrcode';


const QRCodeGenerator = (text: string):Promise<string> => {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(text, (err, url: unknown) => {
            if (err) {
                reject(err);
            } else {
                resolve(url as string);
            }
        }
        );
    }
    );
}
export default QRCodeGenerator;