// qr-decoder.service.ts

import { Injectable } from '@angular/core';
import { QRCode } from 'jsqr';

@Injectable({
  providedIn: 'root',
})
export class QrDecoderService {
    /* decodeQrCode(imageData: ImageData): string | null {
    const qrCode: QRCode | null = jsQR(imageData.data, imageData.width, imageData.height);
    return qrCode ? qrCode.data : null;
    } */
}
