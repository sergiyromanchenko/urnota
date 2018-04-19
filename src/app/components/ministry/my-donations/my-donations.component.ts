import { Component, OnInit } from '@angular/core';
import { ProfileService } from "@app/services/profile.service";
import { ApiService } from "@app/services/api.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.scss']
})
export class MyDonationsComponent implements OnInit {
  profile: any = {};
  limit: number = 3;
  getAvatar = this.profileService.getUserAvatarSrc;
  ministryDetails:any = null
  members: Array<any> = [
    {
      avatar: "../../../assets/images/about/team/Andrey-Shapoval.jpg",
      name: "Andrey Shapoval",
      role: "Founder"
    },
    {
      avatar: "../../../assets/images/about/team/Yuriy-Knysh.jpg",
      name: "Yuriy Knysh",
      role: "Director, Media Team"
    },
    {
      avatar: "../../../assets/images/about/team/Anatoliy-Gapochka.jpg",
      name: "Anatoliy Gapochka",
      role: "Director, Destiny Center"
    },
    {
      avatar:
        "../../../assets/images/about/team/Vladimir-and-Svetlana-Sviridiuk.jpg",
      name: "Vladimir and Svetlana Sviridiuk",
      role: "Directors, Missions Department"
    },
    {
      avatar: "../../../assets/images/about/team/Peter-and-Mila-Babiy.jpg",
      name: "Peter and Mila Babiy",
      role: "Director, Partners Department"
    },
    {
      avatar: "../../../assets/images/about/team/Sergei-Kucher.jpg",
      name: "Sergei Kucher",
      role: "Director, Act of Love"
    },
    {
      avatar: "../../../assets/images/about/team/Raise-Velichko.jpg",
      name: "Raise Velichko",
      role: "Director, Women’s ministry"
    },
    {
      avatar: "../../../assets/images/about/team/Katerina-Aksenenko.jpg",
      name: "Katerina Aksenenko",
      role: "Director, Kids Department"
    },
    {
      avatar: "../../../assets/images/about/team/Alex-Voronin.jpg",
      name: "Alex Voronin",
      role: "Director, Business Department"
    },
    {
      avatar: "../../../assets/images/about/team/Alex-Zablotskiy.jpg",
      name: "Alex Zablotskiy",
      role: "Director, Worship Department"
    },
    {
      avatar: "../../../assets/images/about/team/Aleksey-Kaznacheyev.jpg",
      name: "Aleksey Kaznacheyev",
      role: "Director, Creative Department"
    }
  ];
  constructor(private profileService: ProfileService, private modalService: NgbModal, private apiService:ApiService) {}

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {

    });
  }

  closeWithDelay(d){
    setTimeout(()=>{
      d("close")
    },100)
  }

  getMinistryDetails(){
    this.apiService.getMyMinistries().subscribe(res => {
      this.ministryDetails = res.data[0].attributes;
    });
  }

  getFundPercent(total, value) {
    let percent = value * 100 / total;
    return percent.toFixed();
  }

  getProfile() {
    this.profileService.getProfile().subscribe(res => {
      this.profile = res.data.attributes;
    });
  }

  ngOnInit() {
    this.getProfile();
    this.getMinistryDetails();
  }

}
