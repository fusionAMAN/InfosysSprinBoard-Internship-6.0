import java.util.Scanner;
class string{
    public static void main(String args[]){
        String name= new String();
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter the name:");
        name=sc.nextLine();
        System.out.println(name);
        int len,i;
        len=name.length();
        System.out.println("lenth of string:"+len);
        for(i=0; i<len; i++)
            System.out.println(name.charAt(i));
        

    }

}