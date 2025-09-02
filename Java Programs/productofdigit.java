import java.util.Scanner;
class productofdigit{
    public static void main(String a[]) {
        int n,p=1;
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter Number");
        n=sc.nextInt();
        while(n>0){
            p=p*(n%10);
            n=n/10;
        }
        System.out.println("Product of Digits\t"+p);

        
    }
}