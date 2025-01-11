import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class SimpleLogin {

    private static final Map<String, String> users = new HashMap<>();

    public static void main(String[] args) {

        users.put("ryan", "psswrd123");
        users.put("goataadi", "12345");
        users.put("barca", "sextuple");

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter your username: ");
        String username = scanner.nextLine();

        System.out.print("Enter your password: ");
        String password = scanner.nextLine();

        System.out.println("Entered username: " + username);
        System.out.println("Entered password: " + password);

        if (isValidUser(username, password)) {
            System.out.println("Login successful! Welcome, " + username + "!");
        } else {
            System.out.println("Invalid username or password.");
        }

        scanner.close();
    }

    private static boolean isValidUser(String username, String password) {
        return users.containsKey(username) && users.get(username).equals(password);
    }
}
