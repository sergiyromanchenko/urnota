// my-upload-item.ts

import { UploadItem }    from '@app/lib/angular2-http-file-upload';

export class AvatarItem extends UploadItem {
    constructor(file: any) {
        super();
        this.file = file;
    }
}
