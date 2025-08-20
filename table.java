import java.util.Scanner;
class table{
    public static void main(String a[]) {
        Scanner sc= new Scanner(System.in);
        int n,j=1;
        System.out.println("Enter a number");
        n=sc.nextInt();
        while(j<=10){
            System.out.println(n*j);
            j=j+1;
        }
        
    }
}