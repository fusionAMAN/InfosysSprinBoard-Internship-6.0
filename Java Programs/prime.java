import java.util.Scanner;
class prime{
    public static void main(String a[]) {
        int n,count=0,i=1;
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the NUmber");
        n=sc.nextInt();
        while(i<=n){
            if(n%i==0)
             count=count+1;
            i=i+1;
        }
        if(count>1){
          System.out.println("Not prime");}
        else{
          System.out.println("Prime");}

        
    }
}