import java.util.Scanner;
class array{
        public static void main(String arg[]) {

        int a[]=new int[10];
        Scanner sc= new Scanner(System.in);
        for(int i=0;i<10;i++){
            System.out.println("Enter the number");
            a[i]=sc.nextInt();
        }
        for(int i=0;i<10;i++){
            System.out.println(i);
        }
        
    }
}