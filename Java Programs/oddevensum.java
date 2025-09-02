import java.util.Scanner;
public class oddevensum {
    public static void main(String args[]) {
        Scanner sc= new Scanner(System.in);
        int n,s=0,e=0,p=1;
        System.out.println("Enter the number");
        n=sc.nextInt();
        while(n>0){
        s=n%10;
        if(s%2==0){
            e=e+s;}
            else
            p=p*s;
        n=n/10; 
        
    }
    System.out.println("Even digit sum"+e);
    System.out.println("odd digit product"+p);
}
}
