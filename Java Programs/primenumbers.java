import java.util.Scanner;
class primenumbers{
    public static void main(String a[]) {
        Scanner sc=new Scanner(System.in);
        int i,j,count;
        for(i=1;i<=100;i++){
            count=0;
            for(j=1;j<=i;j++){
                if(i%j==0){
                    count++;
                }
            }if(count==2){
                System.out.println(i);
        }
        }
        
    }
}