import java.util.Scanner;
class palindrome{
    public static void main(String a[]) {
        Scanner sc=new Scanner(System.in);
        int n,rev=0,z;
        System.out.println("Enter a Number");
        n=sc.nextInt();
        z=n;
        while(n>0){
        rev=(rev*10)+n%10;
        n=n/10;}
        if(rev==z){
         System.out.println("Yes, it is palindrome");}
        else
         System.out.println("NO, it is not palindrome");

    }
}