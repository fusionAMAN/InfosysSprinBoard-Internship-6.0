import java.util.Scanner;
class sum_array_element{
    public static void main(String[] arg){
    int n,sum=0;
    Scanner sc=new Scanner(System.in);
    System.out.print("enter the length of array");
    n=sc.nextInt();
    int a[]=new int[n];
    for(int i=0;i<n;i++){
       System.out.print("enter the number:");
       a[i]=sc.nextInt();
    }
    for(int i=0;i<n;i++){
        System.out.print(a[i]+" ");
        sum=sum+a[i];
        
    }
    System.out.print("\n Sum of elements"+sum);
}
}
