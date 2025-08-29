import java.util.Scanner;
class fibonacci{
    public static void main(String a[]) {
        Scanner sc=new Scanner(System.in);
        int x=0,y=1,z=0,n;
        System.out.println("Enter max value");
        n=sc.nextInt();
        while(z<=n){
            x=y;
            y=z;
            z=x+y;
        }
        System.out.println(z);
    }
}