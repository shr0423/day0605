class Mario extends GameObject {
    //주인공은 이미지를 둘러싼 wrapper
    //와 4개의 센서막대도 있어야 한다

    //js에서 개발자가 생성자를 정의하지않을경우
    //js자체적으로 부모를 먼저 생성해준다하지만
    //개발자가 현재 클래스의 생성자를 정의할 경우
    //개발자가 주도하는 것이기 때문에 js에서 부모를
    //자동 생성해주지 않으므로 개발자가 부모생성처리까지
    //맡아야 한다

    constructor(container, src, width, height, x, y, velX, velY) {
        super(container, src, width, height, x, y, velX, velY);
        //나에대한 초기화
        this.wrapper;//센서들을 감쌀 div
        this.sensorArray = new Array(4);


        this.wrapper = document.createElement("div");
        this.wrapper.style.width = this.width + "px";
        this.wrapper.style.height = this.height + "px";
        //부모인 GameObject에서 img를 stage에 부착했으나,
        //아래의 appendChild에의해 부착대상이
        //wrapper로 변경됨(별도의 removeChild()불필요  )
        this.wrapper.appendChild(this.img);
        this.container.appendChild(this.wrapper);

        //실제적으로 움직이는 대상은 wrapper이므로
        //wrapper에 포지션이 적용되어야 한다
        this.wrapper.style.position = "absolute";
        this.wrapper.style.left = this.x + "px";
        this.wrapper.style.top = this.y + "px";


        //좌측 센서
        this.sensorArray[0] = new Sensor(this.wrapper, 1, 22, -1, ((this.height - 22) / 2));

        //위쪽센서
        this.sensorArray[1] = new Sensor(this.wrapper, 22, 1, (this.width - 22) / 2, -1);

        //우측센서
        this.sensorArray[2] = new Sensor(this.wrapper, 1, 22, this.width, ((this.height - 22) / 2));

        //아래쪽 센서
        this.sensorArray[3] = new Sensor(this.wrapper, 22, 1, (this.width - 22) / 2, this.height);

    }
    setSensor() {
        this.sensorArray[0].x = this.x - 1;
        this.sensorArray[1].x = this.x + (this.width - 22) / 2;
        this.sensorArray[2].x = this.x + this.width;
        this.sensorArray[3].x = this.x + (this.width - 22) / 2;

        this.sensorArray[0].y = this.y + (this.height - 22) / 2;
        this.sensorArray[1].y = this.y - 1;
        this.sensorArray[2].y = this.y + (this.height - 22) / 2;
        this.sensorArray[3].y = this.y + this.height;
    }

    //부모인 GameObject의메서드가 마리오에 적용하기엔
    //무리가 있으므로 부모의 메서드를 업그레이드하여
    //마리오의 상황에 맞게 코드를 변경한다.(오버라이딩)
    tick() {
        this.x += this.velX;
        this.y += this.velY;

        //마리오는 자신의x가 변하면 본인이 버유한 센서의 위치값도
        //갱신시킬 의무가 잇다
        this.setSensor();
    }

    render() {
        this.wrapper.style.left = this.x + "px";
        this.wrapper.style.top = this.y + "px";
    }

}