<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Điều khiển đèn</title>
</head>
<body>
    <h1>Điều khiển đèn</h1>

    @if(session('success'))
        <p>{{ session('success') }}</p>
    @endif

    @if(session('error'))
        <p>{{ session('error') }}</p>
    @endif

    <p>Trạng thái hiện tại: <strong>{{ $light ? $light->status : 'Không có thiết bị' }}</strong></p>

    <form action="/lights/on" method="POST">
        @csrf
        <button type="submit">Bật đèn</button>
    </form>

    <br>

    <form action="/lights/off" method="POST">
        @csrf
        <button type="submit">Tắt đèn</button>
    </form>

    <h2>10 lệnh gần nhất</h2>

    <table border="1" cellpadding="8" cellspacing="0">
        <tr>
            <th>ID</th>
            <th>Thiết bị</th>
            <th>Lệnh</th>
            <th>Đã thực thi</th>
            <th>Thời gian</th>
        </tr>

        @foreach($commands as $command)
            <tr>
                <td>{{ $command->id }}</td>
                <td>{{ $command->device->name ?? 'N/A' }}</td>
                <td>{{ $command->command }}</td>
                <td>{{ $command->executed ? 'Có' : 'Chưa' }}</td>
                <td>{{ $command->created_at }}</td>
            </tr>
        @endforeach
    </table>

    <br>
    <a href="/">Quay lại dashboard</a>
</body>
</html>
