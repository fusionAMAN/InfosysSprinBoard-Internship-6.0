import java.util.Scanner;
class factorial{
    public static void main(String a[]) 
    {
        Scanner sc= new Scanner(System.in);
        int n,fac=1;
        System.out.println("Enter number:");
        n=sc.nextInt();
        if(n==0){
        System.out.println("Factorial=1");}
        else{
            while(n>0){
                fac=fac*n;
                n=n-1;
            }
            System.out.println("Factorial="+fac);
        }

        
    }
}