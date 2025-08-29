public class LargestNumber {
    public static void main(String[] args) {
        int a = 10, b = 25, c = 15;

        if (a > b && a > c) {
            System.out.println("Largest number: " + a);
        } else if (b > c) {
            System.out.println("Largest number: " + b);
        } else {
            System.out.println("Largest number: " + c);
        }
    }
}

