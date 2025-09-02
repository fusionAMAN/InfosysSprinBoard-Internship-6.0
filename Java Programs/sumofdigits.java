import java.util.Scanner;
public class sumofdigits {
    public static void main(String args[]) {
        Scanner sc= new Scanner(System.in);
        int n,s=0;
        System.out.println("Enter Number:");
        n=sc.nextInt();
        while(n>0){
            s=s+n%10;
            n=n/10;
        }
        System.out.println("Sum of digits"+s);
    }
}
