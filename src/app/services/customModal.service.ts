import { Injectable } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Injectable()
export class CustomModalService {
    constructor (private ngbModal: NgbModal) {}

    open (content: any, config?: any) {

        let modal = this.ngbModal.open(content, config);
        if(!modal) return;
        let instance = (modal as any)._windowCmptRef.instance
        // setTimeout(() => {
        //     instance.windowClass = 'd-flex align-items-center hidden'
        // },0)
        if(modal){
            let instance = (modal as any)._windowCmptRef.instance;
        setTimeout(() => {
            instance.windowClass = config.windowClass + ' anim-show'
        },0)

        let fx = (modal as any)._removeModalElements.bind(modal);
        (modal as any)._removeModalElements = () => {
            instance.windowClass = instance.windowClass + ' anim-hide'
            setTimeout(fx, 400)
        }

        return modal
        }
    }
}