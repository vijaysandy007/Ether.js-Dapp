import { Component, OnInit } from '@angular/core';
import { getNetwork } from '@ethersproject/networks';
import { ethers } from "ethers";
declare var window: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'etherjs';
 public provider = new ethers.providers.Web3Provider(window.ethereum)
 public signature: any;
 public isSignature: boolean = false;
 public walletAddress: any;
 public walletBalance: any;
 public isBalance: boolean = false;
 public fromAddress: any;
 public toAddress: any;
 public gasPrice: any;
 public gasLimit: any;
 public amount: any;
 public signer
 public isGetTranacation: boolean = false;
 public transcationHash: any;
 public isVisible: boolean = false;
 public transactionFee: any;
 public currentBlockNumber:any;

 constructor(){}
  ngOnInit(): void {

    window.ethereum.on("accountsChanged", (account: any) => {
      this.connectMetamask()
      this.getBalance()
    })
  }

  async connectMetamask() {

    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.provider.on('network', (getNetwork) => {
    })

    await this.provider.send('eth_requestAccounts', []);
    this.signer = await this.provider.getSigner()
    let signature = await this.signer.signMessage('Are you want to sign in')

    if (signature) {
      this.signature = signature
      this.isSignature = true
    }
    if (this.signer) {
      this.isSignature = true

      this.walletAddress = await this.signer.getAddress()
    }
  }

  async getBalance() {
    const balance = await this.signer.getBalance()
    // const ether = ethers.utils.formatEther(balance)
    const covnvert = 1e18;
    const round = balance.toString() / covnvert
    if (balance) {
      this.walletBalance = round.toFixed(4)
      this.isBalance = true
    }
  }

  async sendTransaction() {

    const usdc = {
      address: "0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4",
      abi: [
        "function gimmeSome() external",
        "function balanceOf(address _owner) public view returns (uint256 balance)",
        "function transfer(address _to, uint256 _value) public returns (bool success)",
      ],
     
    };

    const usdcContract = new ethers.Contract(usdc.address, usdc.abi, this.signer)
    const tx =await usdcContract.gimmeSome({gasPrice:20e9})
    const receipt = await tx.wait()
    console.log(receipt)

    // const tranfer = await this.signer.sendTransaction({
    //   to: '0x1620440B7Ecc2337a501a8F305FFcACA995D8542',
    //   value: ethers.utils.parseEther("0.000001")
    // })

    // const getData = await tranfer
    // if (getData) {
    //   this.fromAddress = getData?.from
    //   this.toAddress = getData?.to
    //   const gasObject = getData?.gasPrice._hex
    //   const gasLimitObj = getData?.gasLimit?._hex?.toString()

    //   const transcation = gasObject * gasLimitObj
    //   const roundTranscation = transcation.toFixed(4)
    //   this.transactionFee = roundTranscation

    //   const valueObj = getData.value._hex.toString();

    //   const convertValue = 1e18
    //   const roundValeObj = valueObj / convertValue

    //   if (getData?.hash) {
    //     this.transcationHash = getData?.hash
    //     this.isGetTranacation = true
    //   }

    //   if (roundValeObj) {
    //     this.amount = roundValeObj
    //     this.isGetTranacation = true
    //   }
    // }

  }

   async getBlockNumber(){
     let currentblock = await this.provider.getBlockNumber()
     alert('Your Current Block Number is:'+ ' ' + currentblock)
     
   }
}
