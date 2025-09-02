import java.util.Scanner;
public class sumn {
    public static void main(String args[]) {
        Scanner sc= new Scanner(System.in);
        int i,n,s=0;
        System.out.println("Enter Number upto which you want to print");
        n=sc.nextInt();
        i=1;
        while(i<=n)
        s=s+i;
        i=i+1;
        System.out.println("Sum"+s);
    }
}