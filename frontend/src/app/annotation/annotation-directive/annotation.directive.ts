import {
  Directive,
  ElementRef, HostBinding,
  HostListener, Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {AnnotationComponent} from '../components/annotation/annotation.component';
import {ModalController, PopoverController} from '@ionic/angular';

@Directive({
  selector: '[annotate]'
})
export class AnnotationDirective implements OnInit{
  icon : ElementRef;
  @Input('annotate') annotations;
  loaded : boolean;

  @HostListener('click',['$event']) click(event : Event){
    if(this.loaded){
      this.presentModal(event);
    }
  }

  @HostListener('mouseenter',['$event']) mouseLeave(event : Event){
    if(this.loaded && this.annotations.show){
      this.rnd.setStyle(this.el.nativeElement,"border-bottom","2px solid red");
    }
  }
  @HostListener('mouseleave',['$event']) mouseEnter(event : Event){
    if(this.loaded && this.annotations.show){
      this.rnd.setStyle(this.el.nativeElement,"border-bottom","2px solid teal");
    }
  }

  constructor(private el : ElementRef,
              private rnd : Renderer2,
              private modalController: ModalController) { }

  ngOnInit(){
    setTimeout(()=>{
      this.loaded = true;
    },3000);
  }
  ngOnChanges(){
    if(this.annotations.show){
      this.rnd.setStyle(this.el.nativeElement,"border-bottom", "2px solid teal");
    }else{
      this.rnd.setStyle(this.el.nativeElement,'border-bottom','0px');
    }
  }

  async presentModal(ev: any) {
    const modal = await this.modalController.create({
      component: AnnotationComponent,
      componentProps: {
        modalContr : this.modalController,
        nativeElement: this.el.nativeElement,
        annotations: this.annotations.annotation},
    keyboardClose:true,
    animated: true,
    mode:'md',
    cssClass: 'modalClass',
      showBackdrop:false});
    return await modal.present();
  }
}



